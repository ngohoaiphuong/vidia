# == Schema Information
#
# Table name: action_managements
#
#  id           :bigint           not null, primary key
#  action       :integer
#  deleted_at   :datetime
#  received     :boolean          default(FALSE)
#  sent         :boolean          default(FALSE)
#  sent_counter :integer          default(0)
#  targets      :string           default([]), is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :integer
#
# Indexes
#
#  index_action_managements_on_deleted_at  (deleted_at)
#

class ActionManagement < ApplicationRecord
  acts_as_paranoid
  connects_to database: { writing: :general, reading: :general }
  enum action: [
    :change_password,
    :refresh_ui
  ]
  belongs_to :account
  after_commit :active_job, on: :create
  scope :sent_wait_response, -> { where(sent: true, received: false) }
  scope :waitting, -> { where(sent: false).or(sent_wait_response) }
  scope :by_account, -> (account) { where(account_id: account) }

  def sent!
    self.update(sent: true, sent_counter: sent_counter + 1)
  end

  def done!
    self.update(sent: true, received: true, sent_counter: sent_counter + 1)
  end

  def sgid
    self.to_sgid(expires_in: 30.minutes, for: 'response').to_s
  end

  private
  def active_job
    ClientJob.perform_later self.to_global_id.to_s
  end
end

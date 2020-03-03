# == Schema Information
#
# Table name: accounts
#
#  id                     :bigint           not null, primary key
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  deleted_at             :datetime
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  locked_at              :datetime
#  phone_number           :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  secure                 :boolean          default(FALSE)
#  sign_in_count          :integer          default(0), not null
#  slug                   :string
#  unlock_token           :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_accounts_on_deleted_at            (deleted_at)
#  index_accounts_on_email                 (email) UNIQUE
#  index_accounts_on_reset_password_token  (reset_password_token) UNIQUE
#  index_accounts_on_slug                  (slug) UNIQUE
#

class Account < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary_replica }
  extend FriendlyId
  has_logidze
  rolify
  acts_as_paranoid
  friendly_id :username, use: :slugged  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :lockable

  default_scope { order(:created_at) }
  
  attr_writer :login_by
  has_many :action_managements, dependent: :destroy
  has_one :user, dependent: :destroy 

  def login_by
    @login_by || username || phone_number || email
  end  

  class << self
    def find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if (username = conditions.delete(:username))
        with_role(:employee).where(conditions.to_h).
        where([
          'lower(phone_number) = :value OR lower(email) = :value',
          { value: username.strip.downcase }
        ]).first
      elsif conditions.has_key?(:phone_number) || conditions.has_key?(:email)
        with_role(:employee).where(conditions.to_h).first
      end
    end
  end    
end

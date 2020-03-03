# == Schema Information
#
# Table name: users
#
#  id           :bigint           not null, primary key
#  address      :string
#  email        :string
#  fullname     :string
#  phone_number :string
#  sex          :integer
#  slug         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :integer
#
# Indexes
#
#  index_users_on_slug  (slug) UNIQUE
#

class User < ApplicationRecord
  has_logidze
  connects_to database: { writing: :account, reading: :account_replica }
  store :address, accessors: [ :street , :city , :district, :ward, :ref ]
  belongs_to :account, dependent: :destroy, required: false
end

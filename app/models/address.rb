# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  address_type :integer          default("0")
#  code         :string
#  deleted_at   :datetime
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  ghtk_id      :integer
#  parent_id    :integer
#
# Indexes
#
#  index_addresses_on_deleted_at  (deleted_at)
#
class Address < ApplicationRecord
  connects_to database: { writing: :general, reading: :general_replica }
  enum address_type: [
    :other,
    :nation,
    :city,
    :district,
    :ward
  ]
  has_many :sub_addresses, class_name: 'Address', foreign_key: 'parent_id'
  belongs_to :main_address, class_name: 'Address', foreign_key: 'parent_id', required: false
end

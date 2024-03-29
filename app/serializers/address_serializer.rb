# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  address_type :integer          default("0")
#  ancestry     :string
#  code         :string
#  deleted_at   :datetime
#  name         :string
#  slug         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  ghtk_id      :integer
#
# Indexes
#
#  index_addresses_on_ancestry    (ancestry)
#  index_addresses_on_deleted_at  (deleted_at)
#  index_addresses_on_slug        (slug) UNIQUE
#
class AddressSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :code, :address_type, :name, :parent_id, :slug
end

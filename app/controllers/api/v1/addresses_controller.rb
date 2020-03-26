module Api
  module V1
    class AddressesController < Api::CoreBaseController
      skip_before_action :authenticate_api_account!

      api :GET, '/v1/addresses/summary', 'Get summary about addresses'
      meta author: { name: 'Vidia' }
      def summary
        cities, districts, wards = [Address.city.length, Address.district.length, Address.ward.length]
        render status: 200, json: {
          total: Address.count,
          cities: {
            total: cities,
            pagings: paging(api_addresses_path(:city), cities, LIMIT_RECORDS)
          },
          districts: {
            total: districts,
            pagings: paging(api_addresses_path(:district), districts, LIMIT_RECORDS)
          },
          wards: {
            total: wards,
            pagings: paging(api_addresses_path(:ward), wards, LIMIT_RECORDS)
          }
        }
      end

      api :GET, '/v1/addresses/index/:address_type', 'Get all addresses'
      meta author: { name: 'Vidia' }
      def index
        offset = params[:offset] || 0
        address_type = params[:address_type]
        success AddressSerializer.new(Address.send(address_type).offset(offset).limit(LIMIT_RECORDS))
      end

      api :GET, '/v1/addresses/cities/:id', 'Get city info'
      meta author: { name: 'Vidia' }
      param :id, String, desc: "City ID"
      def show
        success AddressSerializer.new(Address.city.where(slug: params[:id]))
      end

      private
      def paging(url, total, limit)
        offset = 0
        pagings = [{ 
          url: url
          }]
        while (offset = limit + offset ) < total do
          pagings << {
            url: "#{url}?offset=#{offset}"
          }
        end
        pagings
      end
    end  
  end
end

module Api
  module V1
    module Addresses
      class DistrictsController < Api::CoreBaseController
        skip_before_action :authenticate_api_account!
        before_action :cities
  
        api :GET, 'v1/addresses/cities/:city_id/districts', 'Get districts list with city'
        meta author: { name: 'Vidia' }
        param :city_id, String, desc: "City ID"
        def index
          success AddressSerializer.new(
            Address.district.where(parent_id: city)
          )
        end

        api :GET, 'v1/addresses/cities/:city_id/districts/:id', 'Get district info with city'
        meta author: { name: 'Vidia' }
        param :city_id, String, desc: "City ID"
        param :id, String, desc: "District ID"
        def show
          success AddressSerializer.new(
            Address.district.where(parent_id: city, slug: params[:id])
          )
        end

        api :GET, 'v1/addresses/districts', 'Get districts info'
        meta author: { name: 'Vidia' }
        def districts
          success AddressSerializer.new(
            Address.district
          )
        end

        private
        def cities
          @cities = Address.city
        end

        def city
          @cities.where(slug: params[:city_id])
        end
      end  
    end
  end
end

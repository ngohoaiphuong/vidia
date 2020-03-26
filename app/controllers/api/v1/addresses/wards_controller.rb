module Api
  module V1
    module Addresses
      class WardsController < Api::CoreBaseController
        skip_before_action :authenticate_api_account!
  
        api :GET, 'v1/addresses/cities/:city_id/districts/:district_id/wards', 'Get wards list with district'
        meta author: { name: 'Vidia' }
        param :city_id, String, desc: "City ID"
        param :district_id, String, desc: "District ID"
        def index
          success AddressSerializer.new(
            Address.ward.where(parent_id: district)
          )
        end

        api :GET, 'v1/addresses/cities/:city_id/districts/:district_id/wards/:id', 'Get cities list with district'
        meta author: { name: 'Vidia' }
        param :city_id, String, desc: "City ID"
        param :district_id, String, desc: "District ID"
        param :id, String, desc: "District ID"
        def show
          success AddressSerializer.new(
            Address.ward.where(parent_id: district, slug: params[:id])
          )
        end

        api :GET, 'v1/addresses/wards', 'Get wards list'
        meta author: { name: 'Vidia' }
        def wards
          success AddressSerializer.new(
            Address.ward
          )
        end

        private
        def district
          Address.district.where(parent_id: city,  slug: params[:district_id])
        end

        def city
          Address.city.where(slug: params[:city_id])
        end
      end
    end
  end
end
module Api
  module V1
    module Addresses
      class CitiesController < Api::CoreBaseController
        skip_before_action :authenticate_api_account!
  
        api :GET, '/v1/addresses/cities', 'Get cities list'
        meta author: { name: 'Vidia' }
        def index
          success AddressSerializer.new(Address.city)
        end

        api :GET, '/v1/addresses/cities/:id', 'Get city info'
        meta author: { name: 'Vidia' }
        param :id, String, desc: "City ID"
        def show
          success AddressSerializer.new(Address.city.where(slug: params[:id]))
        end
      end  
    end
  end
end

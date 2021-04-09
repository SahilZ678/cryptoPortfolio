class Api::V1::CoinmarketcapController < ApplicationController
    require 'net/http'
    require 'net/https'

    def get_crypto_data
        #https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&sort_dir=desc&sort=market_cap&convert=USD&CMC_PRO_API_KEY=059e551f-93e4-4858-801b-3782e9b82b9f
        url = URI.parse('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&sort_dir=desc&sort=market_cap&convert=USD&CMC_PRO_API_KEY=059e551f-93e4-4858-801b-3782e9b82b9f')
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        res = http.request(Net::HTTP::Get.new(url.request_uri))
        puts JSON.parse(res.body)
        respond_to do |format|
            format.json { render :json => res.body }
        end
    end
end
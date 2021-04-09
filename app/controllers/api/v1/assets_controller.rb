class Api::V1::AssetsController < ApplicationController
  before_action :set_asset, only: [:show, :edit, :update, :destroy]
  def index
    @assets = current_user.assets.all
    respond_to do |format|
      format.json {render json: @assets}
    end
  end

  def show
      respond_to do |format|
        format.json { render :show }
      end
  end

  def create
    @asset = current_user.assets.build(asset_params)
      respond_to do |format|
        if @asset.save
          format.json { render :show, status: :created, location: api_v1_asset_path(@asset) }
        else
          format.json { render json: @asset.errors, status: :unprocessable_entity }
        end
      end
  end

  def update
      respond_to do |format|
        if @asset.update(asset_params)
          format.json { render :show, status: :ok, location: api_v1_asset_path(@asset) }
        else
          format.json { render json: @asset.errors, status: :unprocessable_entity }
        end
      end
  end

  def destroy
      @asset.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
  end

  private
    def set_asset
      @asset = Asset.find(params[:id])
    end

  def asset_params
    params.require(:assets).permit(:name, :symbol, :quantity, :purchased_date, :cost_price)
  end
end

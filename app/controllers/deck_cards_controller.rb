class DeckCardsController < ApplicationController
    before_action :set_deck_card, only: [:update, :destroy, :show]

  def index
    @deck = Deck.includes(:deck_cards).includes(:cards).find(params[:deck_id])
    @deck_cards = @deck.deck_cards
  end

  def show
  end

  def create
    @deck_card = DeckCard.new(deck_card_params)
    respond_to do |format|
      if @deck_card.save
        format.html { redirect_to @deck_card, notice: 'Deck card was successfully created.' }
        format.json { render :show, status: :created, location: @deck_card }
      else
        format.html { render :new }
        format.json { render json: @deck_card.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @deck_card.update(deck_card_params.slice(:amount))
        format.html { redirect_to @deck_card, notice: 'Deck card was successfully updated.' }
        format.json { render :show, status: :ok, location: @deck_card }
      else
        format.html { render :edit }
        format.json { render json: @deck_card.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @deck_card.destroy
    respond_to do |format|
      format.html { redirect_to deck_cards_url, notice: 'Deck card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_deck_card
      @deck_card = DeckCard.find(params[:id])
    end


    def deck_card_params
      params.require(:deck_card).permit(:deck_id, :card_id, :amount)
    end
end

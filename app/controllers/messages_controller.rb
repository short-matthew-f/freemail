class MessagesController < ApplicationController
  before_action :require_current_user, only: :inbox
  before_action :user_is_current_user, only: [:index, :new, :create]

  def inbox
    @users = User.all
  end

  def index
    @messages = current_user.received_messages

    respond_to do |format|
      format.html { render text: "Please go to .json" }
      format.json { render json: @messages }
    end
  end

  # def new
  #   @message = current_user.sent_messages.new
  #
  #   respond_to do |format|
  #     format.html { render text: "Please go to .json" }
  #     format.json { render json: @message }
  #   end
  # end

  def create
    @message = current_user.sent_messages.create(message_params)

    respond_to do |format|
      format.html { render text: "Please go to .json" }
      format.json { render json: @message }
    end
  end

  private

  def message_params
    params.require(:message).permit(:recipient_id, :subject, :content, :important)
  end

  def user_is_current_user
    user = User.find(params[:user_id])

    unless user && current_user == user
      redirect_to user_messages_path(current_user)
    end
  end
end

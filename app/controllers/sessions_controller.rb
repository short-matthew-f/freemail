class SessionsController < ApplicationController
  before_action :require_current_user, only: :destroy

  def new
    # when we use form_for @user, it will infer automatically
    # to try to post to users#create because User.new has not
    # persisted, yet.  We'll need to override this in our form
    @user = User.new
  end

  def create
    # login the user, then redirect to content
    @user = User.find_by(username: session_params[:username])

    if @user && @user.authenticate(session_params[:password])
      login!(@user)

      redirect_to inbox_url  
    else
      redirect_to new_session_url
    end
  end

  def destroy
    logout!

    redirect_to new_session_url
  end

  private

  def session_params
    @session_params ||= params.require(:session).permit(:username, :password)
  end
end

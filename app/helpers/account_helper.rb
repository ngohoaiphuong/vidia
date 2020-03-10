module AccountHelper
  def current_account_name
    account_signed_in? ? @current_account.username : 'Username'
  end

  def account_avatar
    account_signed_in? ? 'http://placehold.it/160x160' : 'http://placehold.it/160x160'
  end
end

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# ------------------------------ Add by team -------------------------------------------
gem 'redis', '~> 4.0'
gem 'sidekiq'
gem 'image_processing', '~> 1.2'

group :development do
  gem 'slim'
  gem "better_errors"
  gem "binding_of_caller"

  # for deployment
  gem 'capistrano',         require: false
  gem 'capistrano-rbenv',     require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano3-puma',   require: false
  gem 'capistrano-webpacker-precompile', require: false
  gem 'capistrano-yarn'
  # for model
  gem 'annotate'
  gem 'letter_opener'
  gem 'rails-erd'
  gem 'puma-ngrok-tunnel'
end

gem 'slim-rails'
gem 'active_interaction'
gem 'browser'
gem 'sitemap_generator'
gem 'whenever', require: false
gem 'dotenv-rails'
gem 'uglifier', '>= 1.3.0'
gem 'simple_form'
gem 'i18n-js'

# webpush notificaton from serviceworker
gem 'webpush'
# Routes
gem 'js-routes'

gem 'logidze'
gem 'devise'
gem 'rolify'
gem 'cancancan'
gem 'paranoia', '~> 2.2'
gem 'globalid'
gem 'friendly_id', '~> 5.2.4'

gem 'rest-client'
gem 'pagy'

gem 'apipie-rails'
gem 'fast_jsonapi'
gem 'simple_token_authentication', '~> 1.0'

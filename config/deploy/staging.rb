server '54.255.250.35', port: 2463, user: 'ubuntu', roles: [:migrate, :web, :app, :db, :main, :cronjob], primary: true

set :branch, 'serviceworker'
set :application, 'pelo'

namespace :enviroment do
  task :initial do
    set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
    set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
    set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
    set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
    set :puma_access_log, "#{release_path}/log/puma.error.log"
    set :puma_error_log,  "#{release_path}/log/puma.access.log"
    set :storage_current, "/home/#{fetch(:user)}/apps/#{fetch(:application)}/current"
    set :storage_dir, "#{fetch(:storage_current)}/storage"
    set :storage_link, "/home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/storage"
    set :linked_files, %w{ config/database.yml config/credentials.yml.enc config/master.key config/sidekiq.yml .env }
    set :linked_dirs,  %w{
      log tmp/pids tmp/cache tmp/sockets tmp/sidekiq vendor/bundle public/system
      config/databases .bundle node_modules storage public/packs
    }
  end
end

namespace :sidekiq do
  task :quiet do
    on roles(:app) do
      puts capture("pgrep -f 'sidekiq (.*) #{fetch(:application)}' | xargs kill -USR1")
    end
  end

  task :restart do
    on roles(:app) do
      with rails_env: :production do
        execute :sudo, :systemctl, :restart, :sidekiq
      end
    end
  end
end

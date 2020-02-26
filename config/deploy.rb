lock "~> 3.11.2"

set :rbenv_ruby, "2.6.1"
set :repo_url, "git@github.com:ngohoaiphuong/pelo.git"
set :user, "ubuntu"
set :puma_threads, [4, 16]
set :puma_workers, 0

# ----------------------------------------------------
set :pty, true
set :use_sudo, false
set :stages, [:staging, :production]
set :stage, :production
set :default_stage, :staging
set :rails_env, :production
set :deploy_via, :remote_cache

# -----------------------------------------------------
set :format, :pretty
set :log_level, :debug
set :keep_releases, 5
set :sitemap_roles, :web
set :bundle_roles, :app

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  task :restart do
    on roles(:app) do
      with rails_env: :production do
        execute :sudo, :systemctl, :restart, :puma
      end
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Run rake yarn install"
  task :yarn_install do
    on roles(:web) do
      within release_path do
        # execute("cd #{release_path} && yarn install --silent --no-progress --no-audit --no-optional")
        execute("yarn install --no-lockfile --no-audit --ignore-engines")
      end
    end
  end

  desc "Make sure local git is in sync with remote."
  task :init_enviroment do
    invoke "enviroment:initial"
  end

  task :check_revision do
    on roles(:app, :supplier) do
      unless `git rev-parse HEAD` == `git rev-parse HEAD`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc "Initial Deploy"
  task :initial do
    on roles(:app) do
      before "deploy:restart", "puma:start"
      invoke "deploy"
    end
  end

  desc "Restart application"
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke "puma:restart"
    end
  end

  desc "Mount storage for project"
  task :mount_storage do
  end

  desc "Run migrate for tenancy database"
  task :run_migrate_tenancy do
    on roles(:main) do
      within(release_path) do
        with rails_env: fetch(:rails_env) do
        end
      end
    end
  end

  desc "Run whenever to update cron jobs"
  task :run_whenever do
    on roles(:cronjob) do
      invoke "whenever:update_crontab"
    end
  end

  desc "Run seed data"
  task :seed_data do
    on roles(:main) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, "db:seed"
        end
      end
    end
  end

  desc "Restart nginx server"
  task :restart_nginx do
    on roles(:app) do
      with rails_env: :production do
        execute :sudo, :systemctl, :restart, :nginx
      end
    end
  end

  after "deploy:set_rails_env", :init_enviroment
  before :check_revision, :init_enviroment
  before "deploy:assets:precompile", "deploy:yarn_install"
  before :starting, :check_revision
  after :finishing, :compile_assets
  after :finishing, :cleanup
  # after  :finishing,    :run_whenever
  after :finishing, :run_migrate_tenancy
  before :run_migrate_tenancy, :mount_storage
  after :mount_storage, :restart_nginx
end

namespace :memcached do
  desc "Flush memcached"
  task :clear do
    on roles(:main) do
      within release_path do
        execute :bundle, :exec, "rake cache:clear RAILS_ENV=#{fetch(:stage)}"
      end
    end
  end
end

on roles(:app) do
  after "deploy:starting", "sidekiq:quiet"
  after "deploy:reverted", "sidekiq:restart"
  after "deploy:published", "sidekiq:restart"
  after "deploy:restart", "sidekiq:restart"
  before "deploy:restart", "sidekiq:quiet"
  before "puma:start", "deploy:init_enviroment"
  before "puma:restart", "deploy:init_enviroment"
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_01_111405) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "hstore"
  enable_extension "plpgsql"

  create_table "action_managements", force: :cascade do |t|
    t.integer "account_id"
    t.integer "action"
    t.boolean "sent", default: false
    t.boolean "received", default: false
    t.integer "sent_counter", default: 0
    t.string "targets", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_action_managements_on_deleted_at"
  end

  create_table "addresses", force: :cascade do |t|
    t.integer "address_type", default: 0
    t.string "code"
    t.string "name"
    t.integer "ghtk_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.string "slug"
    t.string "ancestry"
    t.index ["ancestry"], name: "index_addresses_on_ancestry"
    t.index ["deleted_at"], name: "index_addresses_on_deleted_at"
    t.index ["slug"], name: "index_addresses_on_slug", unique: true
  end

  create_table "app_settings", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_app_settings_on_deleted_at"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "welcome_settings", force: :cascade do |t|
    t.integer "day_name"
    t.string "day_message"
    t.integer "app_setting_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "log_data"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_welcome_settings_on_deleted_at"
  end

end

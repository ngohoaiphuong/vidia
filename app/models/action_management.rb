class ActionManagement < ApplicationRecord
  connects_to database: { writing: :general, reading: :general }
end

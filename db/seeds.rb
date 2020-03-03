# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if WelcomeSetting.count == 0
  [
    {
      day_name: 0,
      day_message: {
        morning: 'Buổi sáng yên bình',
        noon: 'Buổi trưa bình yên',
        night: 'Buổi tối vui vẻ'
      }
    },
    {
      day_name: 1,
      day_message: {
        morning: 'Buổi sáng đầu tuần yên bình',
        noon: 'Buổi trưa đầu tuần bình yên',
        night: 'Buổi tối đầu tuần vui vẻ'
      }
    },
    {
      day_name: 2,
      day_message: {
        morning: 'Buổi sáng yên bình',
        noon: 'Buổi trưa bình yên',
        night: 'Buổi tối vui vẻ'
      }
    },
    {
      day_name: 3,
      day_message: {
        morning: 'Buổi sáng yên bình',
        noon: 'Buổi trưa bình yên',
        night: 'Buổi tối vui vẻ'
      }
    },
    {
      day_name: 4,
      day_message: {
        morning: 'Buổi sáng yên bình',
        noon: 'Buổi trưa bình yên',
        night: 'Buổi tối vui vẻ'
      }
    },
    {
      day_name: 5,
      day_message: {
        morning: 'Buổi sáng yên bình',
        noon: 'Buổi trưa bình yên',
        night: 'Buổi tối vui vẻ'
      }
    },
    {
      day_name: 6,
      day_message: {
        morning: 'Buổi sáng cuối tuần yên bình',
        noon: 'Buổi trưa cuối tuần bình yên',
        night: 'Buổi tối cuối tuần vui vẻ'
      }
    }
  ].each { |data| WelcomeSetting.create(data) }
end

if Account.count == 0
  Account.create(
    email: 'admin@pelo.vn',
    username: 'administrator',
    phone_number: '0902574113',
    password: PASSWORD_DEFAULT,
    password_confirmation: PASSWORD_DEFAULT,
    default_role: :employee 
  ).add_role :admin
end
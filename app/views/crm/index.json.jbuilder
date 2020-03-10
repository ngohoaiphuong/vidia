json.total @customers.data.count
json.data do 
  json.array! @customers.data do |customer|
    json.username customer.username
    json.email customer.email
    json.phone_number customer.phone_number
    json.created_at customer.created_at.strftime('%d/%m/%Y')
    json.id customer.id
    json.data GlobalClient.to_global(customer)
  end
end

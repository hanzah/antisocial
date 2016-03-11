class CreateBeacons < ActiveRecord::Migration[5.0]
  def change
    create_table :beacons do |t|
      t.string :uuid
      t.string :name
      t.string :auth_token 
      t.timestamps
    end
  end
end

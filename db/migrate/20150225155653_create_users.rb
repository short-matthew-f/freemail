class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :name, null: false
      t.string :password_digest, null: false
      t.string :session_token

      t.timestamps null: false
    end

    # add_index needs :tablename, :columnname, { options }
    # and makes the :columnname searchable much more efficient
    add_index :users, :email, unique: true
  end
end

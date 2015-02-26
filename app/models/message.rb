class Message < ActiveRecord::Base

  validates :subject, :content, :sender_id, :recipient_id, presence: true
  validates :read, :important, inclusion: { in: [true, false] }

  belongs_to :sender, class: User # foreign_key: :sender_id
  belongs_to :recipient, class: User

end

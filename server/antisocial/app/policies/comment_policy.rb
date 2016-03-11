class CommentPolicy < ApplicationPolicy
  class Scope < Struct.new(:beacon, :scope)
    def resolve
      if beacon.present?       
        scope
      else
        raise Pundit::NotAuthorizedError.new("Not authorized!")
      end
    end
  end

  def create?
    beacon == record.beacon
  end

  def permitted_attributes
    [:text]
  end
end
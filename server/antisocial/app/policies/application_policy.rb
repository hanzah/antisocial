class ApplicationPolicy
  attr_reader :beacon, :record

  def initialize(beacon, record)
    @beacon = beacon
    @record = record
  end

  def scope
    Pundit.policy_scope!(beacon, record.class)
  end
end


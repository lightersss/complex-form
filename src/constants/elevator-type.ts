export enum ELEVATOR_TYPE_ENUM {
  PASSAGER_ELEVATOR = 1,
  ESCALATOR = 2,
  MOVING_WALKWAY = 3,
}

export const ELEVATOR_TYPE: readonly ELEVATOR_TYPE_ENUM[] = [
  ELEVATOR_TYPE_ENUM.ESCALATOR,
  ELEVATOR_TYPE_ENUM.MOVING_WALKWAY,
  ELEVATOR_TYPE_ENUM.PASSAGER_ELEVATOR,
];

export const ELEVATOR_TYPE_MAP = {
  [ELEVATOR_TYPE_ENUM.ESCALATOR]: "escalator",
  [ELEVATOR_TYPE_ENUM.MOVING_WALKWAY]: "moving walkway",
  [ELEVATOR_TYPE_ENUM.PASSAGER_ELEVATOR]: "passager elevator",
};

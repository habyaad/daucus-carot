import { UserType } from "src/common/enums"

export interface JwtPayloadDto{
    key: string //email for parents or username for student
    userType: UserType
}
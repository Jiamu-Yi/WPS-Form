import {IresGetInfo} from "@/api/user/api";

export default {
    SAVEUSERINFO(state: any, data: IresGetInfo) {
        state.userInfo = data;
    },
    SAVE_CURRENT_PROBLEM_ID(state: any, currentProblemId: string) {
        state.currentProblemId = currentProblemId;
    }
}

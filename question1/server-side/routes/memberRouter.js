import express from "express";
import MemberController from "../controllers/memberController.js";
const memberRouter = express.Router();

let memberController = new MemberController();

memberRouter.post('/',memberController.createMember)
memberRouter.get('/',memberController.getAllMembers)
memberRouter.get('/:id',memberController.getMember)
memberRouter.put('/:id',memberController.updateMember)
memberRouter.delete('/:id',memberController.deleteMember)

export {
    memberRouter
}
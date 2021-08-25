import {Router} from 'express';
import {postAuthorController} from './author.controller';


export const authorRoute = Router()

authorRoute.post("/", postAuthorController)
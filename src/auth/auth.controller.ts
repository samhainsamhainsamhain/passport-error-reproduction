import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() response: Response) {
    return response.send(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() request: Request, @Res() response: Response) {
    response.send(request.user);
  }

  @Post('logout')
  logout() {}
}

// When call super.logIn(request) method on AuthGuard it returns error...
// Hi guys! Right now i'm using Anson's  chat-platform-nestjs
// as a reference for my project but i'm getting an error when i try to login with correct user credentials(screenshot 1)
// As far as i know there is nothing different with auth process, but error is still persists. I've tried to find questions on this topic here, but there were no results. I would really appreciate if someone will help me with it.

// here is the link for my repository https://github.com/samhainsamhainsamhain/todonet

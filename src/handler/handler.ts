import { select, confirm, input } from '@inquirer/prompts';

interface Handler {
  setNext(h: Handler): Handler;
  handle(request: {
    [key: string]: string | boolean;
  }): { [key: string]: string | boolean } | null;
}

export type Prompts = typeof select | typeof confirm | typeof input;

export class BaseHandler implements Handler {
  private _next: Handler;

  public setNext(handler: Handler): Handler {
    this._next = handler;
    return handler;
  }

  public handle(request: {
    [key: string]: string | boolean;
  }): { [key: string]: string | boolean } | null {
    if (this._next) {
      return this._next.handle(request);
    }
    return request;
  }
}

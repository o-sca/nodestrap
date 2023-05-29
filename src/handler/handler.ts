interface Handler {
  setNext(h: Handler): Handler;
  handle(request: {
    [key: string]: string | boolean;
  }): Promise<{ [key: string]: string | boolean } | null>;
}

export class BaseHandler implements Handler {
  private _next: Handler;

  public setNext(handler: Handler): Handler {
    this._next = handler;
    return handler;
  }

  public async handle(request: {
    [key: string]: string | boolean;
  }): Promise<{ [key: string]: string | boolean } | null> {
    if (this._next) {
      return this._next.handle(request);
    }
    return request;
  }
}

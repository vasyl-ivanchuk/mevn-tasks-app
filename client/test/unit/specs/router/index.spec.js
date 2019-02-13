import { beforeEach as routeBeforeEach } from '@/router';
import store from '@/store/store';

jest.mock('@/store/store', () => ({
  getters: {
    'user/isAuthenticated': false,
  },
}));

describe('route beforeEach', () => {
  const next = jest.fn();

  beforeEach(() => {
    Object.defineProperty(store.getters, 'user/isAuthenticated', {
      get: jest.fn(() => false),
    });
  });

  afterEach(() => {
    next.mockClear();
  });

  describe('when auth for route is not required', () => {
    const to = {
      matched: [],
    };

    it('should call next middleware', () => {
      routeBeforeEach(to, null, next);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('when auth for route is required', () => {
    const to = {
      matched: [{
        meta: { requiresAuth: true },
      }],
    };

    describe('when user is loggedIn', () => {
      beforeEach(() => {
        Object.defineProperty(store.getters, 'user/isAuthenticated', {
          get: jest.fn(() => true),
        });
      });

      it('should call next middleware', () => {
        routeBeforeEach(to, null, next);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe('when user is not loggedIn', () => {
      it('should call next middleware with login route name', () => {
        routeBeforeEach(to, null, next);
        expect(next).toHaveBeenCalledWith({ name: 'login' });
      });
    });
  });
});

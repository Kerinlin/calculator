import { limitInteger } from "./limitInteger";

const installDirectives = app => {
  app.directive("limit-integer", limitInteger);
};

export default installDirectives;

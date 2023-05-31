const ApplicationController = require("./ApplicationController");

describe("ApplicationController", () => {
  let applicationController;

  beforeEach(() => {
    applicationController = new ApplicationController();
  });

  describe("#handleGetRoot", () => {
    it("should return status 200 with a success message", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      applicationController.handleGetRoot({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "OK",
        message: "BCR API is up and running!",
      });
    });
  });

  describe("#handleNotFound", () => {});
});

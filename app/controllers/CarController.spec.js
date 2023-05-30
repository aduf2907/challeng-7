const CarController = require("./CarController");

describe("CarController", () => {
  describe("#handleListCars", () => {
    it("should call res.status(200) and a JSON object containing cars and pagination", async () => {
      const mockRequest = { query: { pageSize: 10 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCarModel = {
        findAll: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      };

      const controller = new CarController({ carModel: mockCarModel });

      await controller.handleListCars(mockRequest, mockResponse);

      expect(mockCarModel.findAll).toHaveBeenCalled();
      expect(mockCarModel.count).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        cars: [],
        meta: {
          pagination: expect.any(Object),
        },
      });
    });
  });
});

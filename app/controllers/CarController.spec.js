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

  describe("#handleCreateCar", () => {
    const mockRequest = {
      body: {
        name: "Avanza",
        price: 150000,
        size: "Medium",
        image: "AvanzaCar.jpg",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockCarModel = {
      create: jest.fn().mockResolvedValue(mockRequest.body),
    };

    const controller = new CarController({
      carModel: mockCarModel,
    });

    it("should respond with status 201 and return the created car object", async () => {
      await controller.handleCreateCar(mockRequest, mockResponse);

      expect(mockCarModel.create).toHaveBeenCalledWith({
        name: "Avanza",
        price: 150000,
        size: "Medium",
        image: "AvanzaCar.jpg",
        isCurrentlyRented: false,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body);
    });

    it("should respond with status 422 and an error object if an error occurs", async () => {
      const errorMessage = "Some error occurred";
      mockCarModel.create.mockRejectedValue(new Error(errorMessage));

      await controller.handleCreateCar(mockRequest, mockResponse);

      expect(mockCarModel.create).toHaveBeenCalledWith({
        name: "Avanza",
        price: 150000,
        size: "Medium",
        image: "AvanzaCar.jpg",
        isCurrentlyRented: false,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "Error",
          message: errorMessage,
        },
      });
    });
  });
});

import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders the input and button", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(
      /Enter latitude, longitude/i
    );
    const buttonElement = screen.getByRole("button", { name: /Get image/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("fetches and displays the image on button click", async () => {
    const mockData = { url: "https://mock-image-url.com/image.jpg" };
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    render(<App />);
    const inputElement = screen.getByPlaceholderText(
      /Enter latitude, longitude/i
    );
    const buttonElement = screen.getByRole("button", { name: /Get image/i });
    fireEvent.change(inputElement, { target: { value: "40.7128,-74.006" } });
    fireEvent.click(buttonElement);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.nasa.gov/planetary/earth/assets?lat=40.7128&lon=-74.006&date=2018-01-01&dim=0.15&api_key=9ixRXXctRst5hZPML6IR3zALdWgtvmUXNckEKHyk"
    );
    const imageElement = await screen.findByAltText(/Aerial photography/i);
    expect(imageElement).toHaveAttribute("src", mockData.url);
  });
});

import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/product.js";

export default async function handler(request, response) {
  try {
    await dbConnect();

    const { id } = request.query;

    if (request.method === "GET") {
      // use populate after product is found, else it will not work
      const product = await Product.findById(id);
      const productWithReviews = await product.populate("reviews");

      if (!product) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(productWithReviews);
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

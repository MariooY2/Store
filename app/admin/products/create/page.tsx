"use client";

import { useState } from "react"; // Import useState
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import { Textarea } from "@/components/ui/textarea";
import { createProductAction } from "@/Backend/actions/CreateProductAction"; // Import the server action
import { useRouter } from "next/navigation";
function CreateProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission
  const router = useRouter();
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });
  const price = faker.number.int({ min: 50, max: 500 });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); // Get form data
    setIsSubmitting(true); // Set submitting state to true

    try {
      await createProductAction(formData); // Call server-side action
      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error (optional: show error message)
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Create Product</h1>
      <div className="border p-8 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="flex flex-col mb-4">
            <Label htmlFor="name" className="mb-2 text-lg font-medium">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={name}
              required
              className="border rounded-lg p-2"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col mb-4">
            <Label htmlFor="company" className="mb-2 text-lg font-medium">
              Company Name
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              defaultValue={company}
              required
              className="border rounded-lg p-2"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col mb-4">
            <Label htmlFor="price" className="mb-2 text-lg font-medium">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="text"
              defaultValue={price}
              placeholder="Enter price"
              required
              className="border rounded-lg p-2"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col mb-4">
            <Label htmlFor="image" className="mb-2 text-lg font-medium">
              Product Image
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              className="border rounded-lg p-2"
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col mb-4">
            <Label
              htmlFor="ProductDescription"
              className="mb-2 text-lg font-medium"
            >
              Product Description
            </Label>
            <Textarea
              id="ProductDescription"
              name="ProductDescription"
              defaultValue={description}
              required
              className="border rounded-lg p-2 h-32 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="mt-4"
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CreateProductPage;

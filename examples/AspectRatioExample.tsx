
import { AspectRatio } from "@/components/ui/AspectRatio";

export default function AspectRatioExample() {
  return (
    <div className="w-full h-full space-y-6 p-4">
      <div className="w-full">
        <AspectRatio ratio={16 / 9} className="border rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Random"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>

       </div>
  );
}

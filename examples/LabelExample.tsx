import  Checkbox  from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"

export default function LabelExample() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}

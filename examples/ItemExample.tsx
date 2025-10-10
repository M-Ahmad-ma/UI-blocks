import {
  Item,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
  ItemFooter,
} from "@/components/ui/Item"

import { Button } from "@/components/ui/Button"
import { Star } from "lucide-react"

export default function ItemExample() {
  return (
    <ItemGroup>
      <Item variant='outline'>
        <ItemHeader>
          <ItemMedia variant="icon">
            <Star />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Premium Feature</ItemTitle>
            <ItemDescription>Unlock access to exclusive tools</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">Upgrade</Button>
          </ItemActions>
        </ItemHeader>
      </Item>


      <Item className="my-4" variant="outline">
        <ItemContent>
          <ItemTitle>Free Tier</ItemTitle>
          <ItemDescription>Limited access to basic tools</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

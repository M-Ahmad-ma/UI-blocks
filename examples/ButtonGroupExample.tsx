"use client"

import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react"

import { Button } from "@/components/ui/Button" 
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/Dropdown"

export function ButtonGroupExample() {   
  return (
    <ButtonGroup className="ml-9">
      <Button variant="outline">Follow</Button>
      <Dropdown>
        <DropdownTrigger varient="outline"> 
            <ChevronDownIcon />    
        </DropdownTrigger>
        <DropdownContent align="end" className="[--radius:1rem]">
          <DropdownGroup>
            <DropdownItem>
              <VolumeOffIcon />
              Mute Conversation
            </DropdownItem>
            <DropdownItem>
              <CheckIcon />
              Mark as Read
            </DropdownItem>
            <DropdownItem>
              <AlertTriangleIcon />
              Report Conversation
            </DropdownItem>
            <DropdownItem>
              <UserRoundXIcon />
              Block User
            </DropdownItem>
            <DropdownItem>
              <ShareIcon />
              Share Conversation
            </DropdownItem>
            <DropdownItem>
              <CopyIcon />
              Copy Conversation
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownGroup>
            <DropdownItem variant="destructive">
              <TrashIcon />
              Delete Conversation
            </DropdownItem>
          </DropdownGroup>
        </DropdownContent>
      </Dropdown>
    </ButtonGroup>
  )
}

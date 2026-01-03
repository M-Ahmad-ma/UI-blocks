"use client"

import * as React from "react"
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownGroup,
    DropdownLabel,
    DropdownItem,
    DropdownCheckboxItem,
    DropdownRadioGroup,
    DropdownRadioItem,
    DropdownSeparator,
    DropdownSub,
    DropdownSubTrigger,
    DropdownSubContent,
} from "../components/ui/Dropdown" 

export default function DropdownExample() {
    const [checked, setChecked] = React.useState(false)
    const [radioValue, setRadioValue] = React.useState("option1")

    return (
        <div className="p-4">
            <Dropdown>
                <DropdownTrigger>Open Menu</DropdownTrigger>

                <DropdownContent>
                    <DropdownGroup>
                        <DropdownLabel>Main Actions</DropdownLabel>
                        <DropdownItem onSelect={() => alert("New clicked")}> New</DropdownItem>
                        <DropdownItem onSelect={() => alert("Open clicked")}> Open</DropdownItem>
                        <DropdownItem variant="destructive" onSelect={() => alert("Delete clicked")}>
                            Delete
                        </DropdownItem>
                    </DropdownGroup>

                    <DropdownSeparator />

                    <DropdownCheckboxItem
                        checked={checked}
                        onCheckedChange={setChecked}
                    >
                        Enable feature
                    </DropdownCheckboxItem>


                    <DropdownSeparator />

                    <DropdownRadioGroup value={radioValue} onChange={setRadioValue}>
                        <DropdownRadioItem value="option1">Option 1</DropdownRadioItem>
                        <DropdownRadioItem value="option2">Option 2</DropdownRadioItem>
                        <DropdownRadioItem value="option3">Option 3</DropdownRadioItem>
                    </DropdownRadioGroup>

                    <DropdownSeparator />

                    <DropdownSub>
                        <DropdownSubTrigger>More Options</DropdownSubTrigger>
                        <DropdownSubContent>
                            <DropdownItem onSelect={() => alert("Sub Item 1 clicked")}>Sub Item 1</DropdownItem>
                            <DropdownItem onSelect={() => alert("Sub Item 2 clicked")}>Sub Item 2</DropdownItem>
                            <DropdownSub>
                                <DropdownSubTrigger>Even More</DropdownSubTrigger>
                                <DropdownSubContent>
                                    <DropdownItem onSelect={() => alert("Deep Item 1")}>Deep Item 1</DropdownItem>
                                    <DropdownItem onSelect={() => alert("Deep Item 2")}>Deep Item 2</DropdownItem>
                                </DropdownSubContent>
                            </DropdownSub>
                        </DropdownSubContent>
                    </DropdownSub>
                </DropdownContent>
            </Dropdown>
        </div>
    )
}

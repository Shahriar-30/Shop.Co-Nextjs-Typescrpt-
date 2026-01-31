"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AlignStartVertical } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import AllProducts from "@/components/products/AllProducts";

const page = () => {
  let [category, setCategory] = useState("All");
  let [size, setSize] = useState("small");
  let [sliderValue, setSliderValue] = useState<[number]>([50]);

  let resetFilters = () => {
    setCategory("All");
    setSize("small");
    setSliderValue([50]);
  };
  let handelFilter = () => {
    alert("Filters Applied");
  };
  useEffect(() => {
    resetFilters();
  }, []);

  return (
    <div className="py-8">
      <h1 className="font-mono font-bold text-4xl">Products Page</h1>
      <p>Welcome to the Products page!</p>
      <div className="lg:hidden">
        <Drawer direction="right" modal={true}>
          <DrawerTrigger asChild className="mt-3">
            <AlignStartVertical color="#000000" size={30} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>

            {/* <DrawerDescription asChild className="px-4"> */}
            <div>
              <div className="flex flex-col w-full p-4">
                <h1 className="font-bold text-3xl">Filters</h1>
                <div className="flex gap-4 justify-between">
                  <Button className="mt-4 mb-6" onClick={handelFilter}>
                    Apply Filters
                  </Button>
                  <Button
                    className="mt-4 mb-6"
                    variant="outline"
                    onClick={resetFilters}
                  >
                    Clear All
                  </Button>
                </div>

                {/* category */}
                <div>
                  <h4 className="font-bold text-2xl ">Category</h4>
                  <RadioGroup
                    defaultValue={category}
                    value={category}
                    onValueChange={(e) => setCategory(e)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="All"
                        id="All"
                        className="data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="All">All</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="T-shirts"
                        id="T-shirts"
                        className="data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="T-shirts">T Shirts</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="Shorts"
                        id="Shorts"
                        className="data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="Shorts">Shorts</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="Shirts"
                        id="Shirts"
                        className="text-black data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="Shirts">Shirts</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="Jeans"
                        id="Jeans"
                        className="data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="Jeans">Jeans</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="font-bold text-2xl my-5">Size</h4>
                  <RadioGroup
                    defaultValue={size}
                    value={size}
                    onValueChange={(e) => setSize(e)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">Small</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="xlarge" id="xlarge" />
                      <Label htmlFor="xlarge">X-Large</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="font-bold text-2xl my-5">Price Range</h4>
                  <p>Selected price range: ${sliderValue}</p>
                  <Slider
                    defaultValue={sliderValue}
                    max={100}
                    step={1}
                    className="mx-auto w-full max-w-xs"
                    onValueChange={(e) => setSliderValue(e as [number])}
                  />
                </div>
              </div>
            </div>
            {/* </DrawerDescription> */}
          </DrawerContent>
        </Drawer>
      </div>
      <div className="lg:flex mt-8">
        <div className="hidden lg:flex lg:flex-col border-r border-gray-300 w-[400px] p-4">
          <h3 className="font-bold font-3xl">Filters</h3>
          <div className="flex gap-4 justify-between">
            <Button className="mt-4 mb-6" onClick={handelFilter}>
              Apply Filters
            </Button>
            <Button
              className="mt-4 mb-6"
              variant="outline"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          </div>
          {/* category */}
          <div>
            <h4 className="font-bold font-2xl my-5">Category</h4>
            <RadioGroup
              defaultValue={category}
              value={category}
              className="data-[state=checked]:border-purple-600"
              onValueChange={(e) => setCategory(e)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="All" id="All" />
                <Label htmlFor="All">All</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="T-shirts" id="T-shirts" />
                <Label htmlFor="T-shirts">T Shirts</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Shorts" id="Shorts" />
                <Label htmlFor="Shorts">Shorts</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="Shirts"
                  id="Shirts"
                  className="text-black"
                />
                <Label htmlFor="Shirts">Shirts</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Jeans" id="Jeans" />
                <Label htmlFor="Jeans">Jeans</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h4 className="font-bold font-2xl my-5">Size</h4>
            <RadioGroup
              defaultValue={size}
              value={size}
              onValueChange={(e) => setSize(e)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="xlarge" id="xlarge" />
                <Label htmlFor="xlarge">X-Large</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h4 className="font-bold font-2xl my-5">Price Range</h4>
            <p>Selected price range: ${sliderValue}</p>
            <Slider
              defaultValue={sliderValue}
              max={100}
              step={1}
              className="mx-auto w-full max-w-xs"
              onValueChange={(e) => setSliderValue(e as [number])}
            />
          </div>
        </div>
        <div className="w-full">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default page;

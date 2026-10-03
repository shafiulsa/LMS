"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserInfo } from '@/app/actions/account';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const ContactInfo = ({ userInfo }) => {
    const [contactState, setContactState] = useState({
        phone: userInfo?.phone || "",
        website: userInfo?.website || userInfo?.socialMedia?.website || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setContactState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const updatedData = {
                phone: contactState.phone,
                website: contactState.website,
                socialMedia: {
                    ...(userInfo?.socialMedia || {}),
                    website: contactState.website,
                },
            };

            await updateUserInfo(userInfo?.email, updatedData);
            toast.success("Contact info updated successfully");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label htmlFor="phone" className="mb-2 block">Phone No. :</Label>
                        <Input
                            name="phone"
                            id="phone"
                            type="tel"
                            placeholder="Phone :"
                            value={contactState.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="website" className="mb-2 block">Website :</Label>
                        <Input
                            name="website"
                            id="website"
                            type="url"
                            placeholder="Website Url :"
                            value={contactState.website}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default ContactInfo;
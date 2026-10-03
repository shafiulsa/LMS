"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from '@/app/actions/account';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const ChangePassword = ({ email }) => {
    const [passwordState, setPasswordState] = useState({
        oldPassword: "",
        newPassword: "",
        reTypePassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        reTypePassword: false,
    });

    const [loading, setLoading] = useState(false);

    const toggleVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setPasswordState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    async function doPasswordChange(event) {
        event.preventDefault();

        if (passwordState.newPassword !== passwordState.reTypePassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        setLoading(true);
        try {
            await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword);
            toast.success("Password changed successfully");
            setPasswordState({
                oldPassword: "",
                newPassword: "",
                reTypePassword: "",
            });
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">
                Change password :
            </h5>
            <form onSubmit={doPasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label htmlFor="oldPassword" className="mb-2 block">Old password :</Label>
                        <div className="relative">
                            <Input
                                type={showPassword.oldPassword ? "text" : "password"}
                                id="oldPassword"
                                name="oldPassword"
                                value={passwordState.oldPassword}
                                onChange={handleChange}
                                placeholder="Old password"
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('oldPassword')}
                                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                                aria-label={showPassword.oldPassword ? "Hide old password" : "Show old password"}
                            >
                                {showPassword.oldPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="newPassword" className="mb-2 block">New password :</Label>
                        <div className="relative">
                            <Input
                                type={showPassword.newPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={passwordState.newPassword}
                                onChange={handleChange}
                                placeholder="New password"
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('newPassword')}
                                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                                aria-label={showPassword.newPassword ? "Hide new password" : "Show new password"}
                            >
                                {showPassword.newPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="reTypePassword" className="mb-2 block">
                            Re-type New password :
                        </Label>
                        <div className="relative">
                            <Input
                                type={showPassword.reTypePassword ? "text" : "password"}
                                id="reTypePassword"
                                name="reTypePassword"
                                value={passwordState.reTypePassword}
                                onChange={handleChange}
                                placeholder="Re-type New password"
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('reTypePassword')}
                                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                                aria-label={showPassword.reTypePassword ? "Hide re-type password" : "Show re-type password"}
                            >
                                {showPassword.reTypePassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
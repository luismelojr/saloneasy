export const formatStringAvatar = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}
export default function FileUpload({ onFileUpload }: FileUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const uploadedFile = e.dataTransfer.files[0];
        processFile(uploadedFile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) processFile(uploadedFile);
    };

    const processFile = (file: File) => {
        if (validateFile(file)) {
            onFileUpload(file);
            setPreview(URL.createObjectURL(file));
            setErrorMessage(null); // Remove mensagem de erro
        } else {
            setErrorMessage(
                'Arquivo inválido. Por favor, envie um arquivo de imagem válido.',
            );
            setPreview(null);
        }
    };

    const validateFile = (file: File): boolean => {
        return (
            file &&
            ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(
                file.type,
            )
        );
    };

    return (
        <div className={'flex flex-col gap-2'}>
            <Label>Imagem</Label>
            <div
                className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed border-primary p-4 transition-all ${isDragging ? 'border-primary' : errorMessage ? 'border-red-500' : 'border-primary/40'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type={'file'}
                    accept={'image/*'}
                    onChange={handleChange}
                    className={'hidden'}
                    id={'fileInput'}
                />
                <label
                    htmlFor="fileInput"
                    className={
                        'flex w-full cursor-pointer flex-col items-center text-gray-500'
                    }
                    onMouseEnter={() => setIsDragging(true)}
                    onMouseLeave={() => setIsDragging(false)}
                >
                    <span className={'text-primary underline'}>
                        Selecione uma imagem
                    </span>{' '}
                    ou arraste e solte aqui.
                </label>
                {errorMessage && (
                    <p className={'mt-2 text-sm text-red-500'}>
                        {errorMessage}
                    </p>
                )}
                {preview && (
                    <img
                        src={preview}
                        alt={'Preview'}
                        className="h-auto max-h-[300px] w-full max-w-[300px] rounded-md border object-contain"
                    />
                )}
            </div>
        </div>
    );
}

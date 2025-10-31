import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ShortcutItem {
  keys: string[];
  description: string;
  category?: string;
}

interface KeyboardShortcutsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts: ShortcutItem[] = [
  { keys: ['?'], description: 'Show keyboard shortcuts', category: 'General' },
  { keys: ['Esc'], description: 'Close panels and dialogs', category: 'General' },
  { keys: ['Ctrl', 'S'], description: 'Toggle sidebar', category: 'Navigation' },
  { keys: ['Ctrl', 'F'], description: 'Toggle filters', category: 'Navigation' },
  { keys: ['/'], description: 'Focus search input', category: 'Navigation' },
  { keys: ['Alt', 'C'], description: 'Clear all filters', category: 'Filters' },
  { keys: ['j'], description: 'Next verse', category: 'Verse Navigation' },
  { keys: ['k'], description: 'Previous verse', category: 'Verse Navigation' },
  { keys: ['b'], description: 'Bookmark current verse', category: 'Actions' },
  { keys: ['↑'], description: 'Navigate up in sidebar', category: 'Sidebar' },
  { keys: ['↓'], description: 'Navigate down in sidebar', category: 'Sidebar' },
  { keys: ['→'], description: 'Expand item / Go deeper', category: 'Sidebar' },
  { keys: ['←'], description: 'Go to parent level', category: 'Sidebar' },
  { keys: ['Enter'], description: 'Toggle expansion / Activate', category: 'Sidebar' },
  { keys: ['Space'], description: 'Toggle expansion', category: 'Sidebar' },
  { keys: ['Home'], description: 'Go to first item', category: 'Sidebar' },
  { keys: ['End'], description: 'Go to last item', category: 'Sidebar' },
];

const KeyboardShortcutsDialog = ({ isOpen, onClose }: KeyboardShortcutsDialogProps) => {
  const dialogRef = useFocusTrap(isOpen);

  if (!isOpen) return null;

  const categories = Array.from(new Set(shortcuts.map((s) => s.category || 'General')));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-vedic-bg border border-vedic-accent/30 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-vedic-bg border-b border-vedic-accent/20 px-6 py-4 flex items-center justify-between">
          <h2 id="shortcuts-title" className="text-2xl font-bold text-vedic-text">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-vedic-accent/10 transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} className="text-vedic-text" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-vedic-sage mb-3">{category}</h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => (s.category || 'General') === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-vedic-ui/50 transition-colors"
                    >
                      <span className="text-vedic-text">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex} className="flex items-center gap-1">
                            <kbd className="px-2 py-1 text-sm font-mono bg-vedic-ui border border-vedic-accent/30 rounded shadow-sm text-vedic-text min-w-[2rem] text-center">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="text-muted-foreground">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-vedic-bg border-t border-vedic-accent/20 px-6 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Press <kbd className="px-2 py-1 text-xs font-mono bg-vedic-ui border border-vedic-accent/30 rounded">?</kbd> anytime to view this dialog
          </p>
        </div>
      </div>
    </>
  );
};

export default KeyboardShortcutsDialog;

import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import About from "./About";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import Contact from "./Contact";

const Footer = () => {
  const [visibleModal, setVisibleModal] = useState(null);

  const openModal = useCallback((key) => setVisibleModal(key), []);
  const closeModal = useCallback(() => setVisibleModal(null), []);

  const links = useMemo(
    () => [
      { label: "O nama", key: "About" },
      { label: "Uslovi korišćenja", key: "Terms" },
      { label: "Politika privatnosti", key: "Privacy" },
      { label: "Kontakt", key: "Contact" },
    ],
    []
  );

  const modalTitle = useMemo(() => {
    const found = links.find((l) => l.key === visibleModal);
    return found?.label ?? "";
  }, [links, visibleModal]);

  const renderModalContent = useCallback(() => {
    switch (visibleModal) {
      case "About":
        return <About />;
      case "Terms":
        return <TermsOfService />;
      case "Privacy":
        return <PrivacyPolicy />;
      case "Contact":
        return <Contact />;
      default:
        return null;
    }
  }, [visibleModal]);

  return (
    <View style={styles.container}>
      <View style={styles.linksWrapper}>
        {links.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => openModal(item.key)}
            style={styles.linkContainer}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.copyText}>
        © {new Date().getFullYear()} Berza rada
      </Text>

      <Modal
        visible={!!visibleModal}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={false}
      >
        <SafeAreaView
          style={styles.modalWrapper}
          edges={["top", "left", "right", "bottom"]}
        >
          <View style={styles.modalHeader}>
            <Text
              style={styles.modalTitle}
              numberOfLines={1}
              accessibilityRole="header"
            >
              {modalTitle}
            </Text>

            <TouchableOpacity
              onPress={closeModal}
              style={styles.headerClose}
              accessibilityRole="button"
              accessibilityLabel="Zatvori"
            >
              <Text style={styles.headerCloseText}>✖</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderModalContent()}
          </ScrollView>

          <TouchableOpacity
            onPress={closeModal}
            style={styles.closeButton}
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingVertical: 25,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
    alignItems: "center",
  },

  linksWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  linkContainer: {
    marginHorizontal: 8,
    marginBottom: 10,
  },

  linkText: {
    fontSize: 14,
    color: "#5B8DB8",
    fontWeight: "600",
  },

  copyText: {
    marginTop: 15,
    fontSize: 12,
    color: "#aaa",
  },

  modalWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B3A57",
    flex: 1,
    paddingRight: 12,
  },

  headerClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },

  headerCloseText: {
    fontSize: 16,
    color: "#333",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  closeButton: {
    backgroundColor: "#5B8DB8",
    paddingVertical: 16,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Footer;
